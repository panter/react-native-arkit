//
//  ARBoxManager.m
//  RCTARKit
//
//  Created by Zehao Li on 8/12/17.
//  Copyright © 2017 HippoAR. All rights reserved.
//

#import "ARLineManager.h"
#import "RCTARKit.h"
#import "RCTARKitGeos.h"
#import "RCTARKitNodes.h"

@implementation ARLineManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(mount:(NSDictionary *)property) {
    [[RCTARKitGeos sharedInstance] addLine:property];
}

RCT_EXPORT_METHOD(unmount:(NSString *)identifier) {
    [[RCTARKitNodes sharedInstance] removeNodeForKey:identifier];
}


@end
