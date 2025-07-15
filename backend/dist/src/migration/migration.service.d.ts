import { Model } from 'mongoose';
import { VideoDocument } from '../schemas/video.schema';
import { SetDocument } from '../schemas/set.schema';
export declare class MigrationService {
    private videoModel;
    private setModel;
    constructor(videoModel: Model<VideoDocument>, setModel: Model<SetDocument>);
    migrateData(): Promise<void>;
}
