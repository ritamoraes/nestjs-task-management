import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS
    ]

    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();
        if(this.isStatusValid(value)){
            return value;
        } else {
            throw new BadRequestException(`${value} is a invalid status`);
        }
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}