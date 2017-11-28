//
//  RNTMapView.h
//  AwesomeRN
//
//  Created by Magicly on 2017/11/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#ifndef RNTMapView_h
#define RNTMapView_h


#endif /* RNTMapView_h */

#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end
