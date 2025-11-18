import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class GlobalQueryOptimizationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(metadata.type === "query" &&  value  &&  typeof value === "object"){
            return Object.fromEntries(
                Object.entries(value).map(([key, val]) => [key.toLowerCase(), val])
            )
        }
        return value
    }
}