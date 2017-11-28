//
//  SwiftAPI.swift
//  AwesomeRN
//
//  Created by Magicly on 2017/11/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

import Foundation

@objc(SwiftAPI)
class SwiftAPI: NSObject {
  
  @objc(add:::)
  func add(a: Double, b: Double, callback: (NSArray) -> ()) -> Void {
    if (b == 0) {
      callback([[
        "success": false,
        "errMsg": "divided by zero"
      ]]);
    } else {
      callback([[
        "success": true,
        "result": a / b
      ]]);
    }
  }
  
  func constantsToExport() -> [String: Any]! {
    return [
      "x": 1,
      "two": 2,
      "z": "string...."
    ]
  }
  
}
