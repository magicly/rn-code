//
//  ObjectCAPI.m
//  AwesomeRN
//
//  Created by Magicly on 2017/11/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ObjectCAPI.h"
#import <React/RCTLog.h>

@implementation ObjectCAPI

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(nativeFunc: (NSString *)msg)
{
  RCTLogInfo(@"this is from native Object-C function, param is: %@", msg);
}

RCT_EXPORT_METHOD(resultFromNativeByCallback:(double)a :(double)b :(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"this is from native Object-C function, param is: %f and %f", a, b);
  double c = a + b;
  callback(@[[NSNull null], [NSNumber numberWithDouble:c]]);
}

RCT_REMAP_METHOD(resultFromNativeByPromise, :(double)a :(double)b :(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject)
{
  if (b == 0) {
    NSError *error = [[NSError alloc] initWithDomain:@"err msg" code:1 userInfo:nil];
    reject(@"divided by zero", @"除数不能为零！", error);
  } else {
    resolve([NSNumber numberWithDouble:(a / b)]);
  }
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"LBSChanged"];
}

- (void)lbsChanged:(double)lat :(double)lng // 模拟LBS信息更新的系统回调函数
{
  [self sendEventWithName:@"LBSChanged" body:@{@"lat": [NSNumber numberWithDouble:lat], @"lng": [NSNumber numberWithDouble:lng]}];
}

RCT_EXPORT_METHOD(mockChangeLBS:(double)lat :(double)lng)
{
  [self lbsChanged:lat:lng];
}

- (NSDictionary *)constantsToExport
{
  return @{ @"name": @"magicly", @"age": @25 };
}

@end
