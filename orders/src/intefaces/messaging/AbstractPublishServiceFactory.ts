import IPublishService from "./IPublishService.ts";

export default abstract class PublishServiceFactory<T> {
    abstract create(): Promise<IPublishService<T>>;
}