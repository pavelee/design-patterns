/*

Proxy - it's structural design pattern, which allows to provide a substitute or placeholder for another object.
It can be used when you need to control access to an object or when you need to add extra functionality to an object.

Problem

- You need to control access to an object
- You need some kind of middleware between client and object, especially if this is external library

Solution

- Create proxy object which implements the same interface as original object
- Proxy object should have reference to original object
- We do not modify original object, we just create proxy object which has the same interface

Real life example

- Credit card it's proxy for bank account. Bank account is proxy for money. All implement interface to allow you to pay for something.

Structure

- Service interface, which defines methods for service and proxy
- Service, which implements Service interface
- Proxy, which implements Service interface and has reference to Service object. Usually proxy manages lifecycle of Service object.
- Client, which uses Proxy object

Usage

- When you want to lazy load some object, you can create proxy object and load original object only when it's needed
- When you need access control to some object
- When you need to to run remote service on local machine
- When you need to log requests or any other actions with object
- When you need to cache results of requests to object, optmise performance
- When you want to destroy object if it's not used for some time

Advantages

- You can control access to original object
- You can manage lifecycle of original object
- Proxy works even if original object is not ready or not available
- Open/Closed Principle. You can introduce new proxies without breaking the existing client code

Disadvantages

- Code may become more complicated because you need to introduce new classes
- Proxy may reduce performance because it adds indirection to calls

*/

interface ThirdPartyYoutubeLib {
  listVideos(): string;
  getVideoInfo(id: string): string;
  downloadVideo(id: string): string;
}

class ThirdPartyYoutubeClass implements ThirdPartyYoutubeLib {
  listVideos(): string {
    return "list of videos";
  }

  getVideoInfo(id: string): string {
    return "video info";
  }

  downloadVideo(id: string): string {
    return "video file";
  }
}

// Proxy, add cache layer
class CachedYouTubeClass implements ThirdPartyYoutubeLib {
  private service: ThirdPartyYoutubeClass;
  private listCache: string[] = [];
  private infoCache: string[] = [];
  private downloadCache: string[] = [];

  constructor(service: ThirdPartyYoutubeClass) {
    this.service = service;
  }

  listVideos(): string {
    if (this.listCache.length === 0) {
      this.listCache.push(this.service.listVideos());
    }
    return this.listCache[0];
  }

  getVideoInfo(id: string): string {
    if (this.infoCache.length === 0) {
      this.infoCache.push(this.service.getVideoInfo(id));
    }
    return this.infoCache[0];
  }

  downloadVideo(id: string): string {
    if (this.downloadCache.length === 0) {
      this.downloadCache.push(this.service.downloadVideo(id));
    }
    return this.downloadCache[0];
  }
}

class YouTubeManager {
  private service: ThirdPartyYoutubeLib;

  constructor(service: ThirdPartyYoutubeLib) {
    this.service = service;
  }

  renderVideoPage(id: string): void {
    console.log(this.service.getVideoInfo(id));
  }

  renderListPanel(): void {
    console.log(this.service.listVideos());
  }

  reactOnUserInput(): void {
    this.renderVideoPage("123");
    this.renderListPanel();
  }
}

const service = new CachedYouTubeClass(new ThirdPartyYoutubeClass());

// we can use proxy object instead of real service object
const manager = new YouTubeManager(service);
