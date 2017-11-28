//
//  RCTConvert+Mapkit.h
//  AwesomeRN
//
//  Created by Magicly on 2017/11/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <MapKit/MapKit.h>
#import <React/RCTConvert.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert+CoreLocation.h>

@interface RCTConvert (Mapkit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json;
+ (MKCoordinateRegion)MKCoordinateRegion:(id)json;

@end
