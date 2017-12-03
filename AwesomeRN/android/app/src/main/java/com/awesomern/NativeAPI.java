package com.awesomern;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nullable;

/**
 * Created by magicly on 2017/11/30.
 */

public class NativeAPI extends ReactContextBaseJavaModule {
    private static final Random random = new Random();

    public NativeAPI(ReactApplicationContext reactContext) {
        super(reactContext);

        mockLBSChange(reactContext);
    }

    private void mockLBSChange(final ReactContext reactContext) {
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
        scheduledExecutorService.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                final WritableMap params = Arguments.createMap();
                params.putDouble("lat", 30 + random.nextDouble());
                params.putDouble("lng", 104 + random.nextDouble());

                System.out.println("in java timer....");
                try {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("LBSChanged", params); // 这行代码发送事件给JS
                } catch (Exception e) {
                    System.out.println("error: " + e.getMessage());
                }
                System.out.println("after send event to js....");
            }
        }, 1, 60, TimeUnit.SECONDS);

    }

    @Override
    public String getName() {
        return "NativeAPI";
    }

    @ReactMethod
    public void nativeFunc(String message, int a, double b) {
        System.out.println("nativeFunc: " + message +  a +  b);
    }

    @ReactMethod
    public void div(int a, int b, Callback successCallback, Callback errorCallback) {
        try {
            successCallback.invoke(a / b);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void div2(int a, int b, Promise promise) {
        try {
            promise.resolve(a / b);
        } catch (Exception e) {
            promise.reject("div error:", e.getMessage());
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("one", 1);
        constants.put("two", 2);

        return constants;
    }
}
