//
//  SwiftAPI.m
//  AwesomeRN
//
//  Created by Magicly on 2017/11/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SwiftAPI, NSObject)

RCT_EXTERN_METHOD(add:(double)a :(double)b :(RCTResponseSenderBlock *)callback)

@end
