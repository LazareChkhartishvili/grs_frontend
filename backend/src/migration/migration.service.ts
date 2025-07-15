import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from '../schemas/video.schema';
import { Set, SetDocument } from '../schemas/set.schema';
import { readFileSync } from 'fs';
import { join } from 'path';

interface RawSetData {
  categoryCode: string;
  setCode: string;
  title: string;
  shortTitle: string;
  description: string;
  url?: string;
  articleUrl?: string;
  requiredAccessories: string[];
  generalInstructions: string[];
  videoCount: number;
  totalDuration: string;
}

interface VideoInput {
  videoId: string;
  title: {
    ka: string;
    en: string;
    ru: string;
  };
  description: {
    ka?: string;
    en?: string;
    ru?: string;
  };
  urls: {
    hd: string;
    sd: string;
  };
  isActive: boolean;
  sortOrder: number;
  viewCount: number;
  isPublic: boolean;
}

interface SetInput {
  setId: string;
  title: {
    ka: string;
    en: string;
    ru: string;
  };
  description: {
    ka?: string;
    en?: string;
    ru?: string;
  };
  videos: VideoDocument['_id'][];
  isActive: boolean;
  sortOrder: number;
  isPublic: boolean;
  viewCount: number;
  monthlyPrice: number;
}

@Injectable()
export class MigrationService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
    @InjectModel(Set.name) private setModel: Model<SetDocument>,
  ) {}

  async migrateData() {
    try {
      // სტრუქტურირებული მონაცემების წაკითხვა
      const rawData = readFileSync(join(__dirname, '../../scripts/structured-video-data.json'), 'utf-8');
      const data = JSON.parse(rawData);
      const sets: RawSetData[] = data.sets;

      console.log(`🎯 დასამიგრირებელი სეტების რაოდენობა: ${sets.length}`);

      for (const setData of sets) {
        console.log(`\n🔄 მიმდინარეობს სეტის მიგრაცია: ${setData.setCode}`);

        // ვიდეოების შექმნა
        const videoDocuments: VideoDocument[] = [];
        for (let i = 1; i <= setData.videoCount; i++) {
          const sequence = `${setData.categoryCode}.${setData.setCode}.${i}`;
          try {
            const videoDoc: VideoInput = {
              videoId: sequence,
              title: {
                ka: `${setData.title} - ვიდეო ${i}`,
                en: `${setData.title} - Video ${i}`,
                ru: `${setData.title} - Видео ${i}`
              },
              description: {
                ka: setData.description,
                en: setData.description,
                ru: setData.description
              },
              urls: {
                hd: `https://ghrs-group.com/vid/1/1080/${sequence}.m4v`,
                sd: `https://ghrs-group.com/vid/1/720/${sequence}.m4v`
              },
              isActive: true,
              sortOrder: i,
              viewCount: 0,
              isPublic: false
            };

            const video = new this.videoModel(videoDoc);
            const savedVideo = await video.save();
            videoDocuments.push(savedVideo);
            console.log(`✅ ვიდეო შენახულია: ${sequence}`);
          } catch (error) {
            console.error(`❌ შეცდომა ვიდეოს შენახვისას ${sequence}:`, error);
          }
        }

        // სეტის შექმნა
        try {
          const setDoc: SetInput = {
            setId: setData.setCode,
            title: {
              ka: setData.title,
              en: setData.title,
              ru: setData.title
            },
            description: {
              ka: setData.description,
              en: setData.description,
              ru: setData.description
            },
            videos: videoDocuments.map(v => v._id),
            isActive: true,
            sortOrder: parseInt(setData.setCode.match(/\d+/)?.[0] || '0'),
            isPublic: false,
            viewCount: 0,
            monthlyPrice: 920
          };

          const set = new this.setModel(setDoc);
          await set.save();
          console.log(`✅ სეტი შენახულია: ${setData.setCode}`);
        } catch (error) {
          console.error(`❌ შეცდომა სეტის შენახვისას ${setData.setCode}:`, error);
        }
      }

      console.log('\n✨ მიგრაცია დასრულებულია');
    } catch (error) {
      console.error('❌ კრიტიკული შეცდომა:', error);
      throw error;
    }
  }
} 