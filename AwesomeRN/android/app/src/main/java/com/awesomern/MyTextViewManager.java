package com.awesomern;

import android.content.Context;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by magicly on 2017/11/30.
 */
public class MyTextViewManager extends SimpleViewManager<TextView> {
    @Override
    public String getName() {
        return "MyTextView";
    }

    @Override
    protected TextView createViewInstance(final ThemedReactContext reactContext) {
//        return new TextView(reactContext);

        final TextView textView = new TextView(reactContext);
        textView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN) {
                    WritableMap nativeEvent = Arguments.createMap();
                    nativeEvent.putString("msg", "this is a message from Java.");
                    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                            textView.getId(),
                            "topChangeXXX",
                            nativeEvent
                    );
                    return true;
                } else {
                    return false;
                }
            }
        });
        return textView;
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        Map<String, Object> map = new HashMap<>();
        map.put("topChangeXXX",
                MapBuilder.of(
                        "phasedRegistrationNames",
                        MapBuilder.of("bubbled", "onChangeXXX")));
        return map;
    }

    @ReactProp(name = "text") // JS里面使用这个名字传递props
    public void setText(TextView view, @Nullable String text) {
        System.out.println("in java setText method...text: " + text);
        view.setText(text);
    }

    @ReactProp(name = "size", defaultFloat = 50)
    public void setTextSize(TextView view, float size) {
        System.out.println("in java setTextSize method, size: " + size);
        view.setTextSize(size);
    }
}
