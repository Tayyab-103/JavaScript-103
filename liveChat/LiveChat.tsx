// components/LiveChat.tsx

import React, { useEffect } from "react";

// Extend the Window interface
interface ExtendedWindow extends Window {
  __lc: {
    license: number;
    _q: any[];
    _h: null | ((...args: any[]) => any);
    _v: string;
    on: (...args: any[]) => void;
    once: (...args: any[]) => void;
    off: (...args: any[]) => void;
    get: (...args: any[]) => void;
    call: (...args: any[]) => void;
    init: () => void;
  };
}

const LiveChat: React.FC = () => {
  useEffect(() => {

    const extendedWindow: any = window as unknown as ExtendedWindow;

    extendedWindow.__lc = extendedWindow.__lc || {};
    extendedWindow.__lc.license = 17181294;
    //17181294
    (function (n, t, c) {
      function i(n: any) {
        return e._h ? e._h.apply(null, n) : e._q.push(n);
      }
      var e = {
        _q: [],
        _h: null,
        _v: "2.0",
        on: function () {
          i(["on", c.call(arguments)]);
        },
        once: function () {
          i(["once", c.call(arguments)]);
        },
        off: function () {
          i(["off", c.call(arguments)]);
        },
        get: function () {
          if (!e._h)
            throw new Error(
              "[LiveChatWidget] You can't use getters before load."
            );
          return i(["get", c.call(arguments)]);
        },
        call: function () {
          i(["call", c.call(arguments)]);
        },
        init: function () {
          var n = t.createElement("script");
          n.async = !0;
          n.type = "text/javascript";
          n.src = "https://cdn.livechatinc.com/tracking.js";
          t.head.appendChild(n);
        },
      };
      !n.__lc.asyncInit && e.init();
      n.LiveChatWidget = n.LiveChatWidget || e;
    })(extendedWindow, document, [].slice);
  }, []);

  return (
    <noscript>
      <a href="https://www.livechat.com/chat-with/17181108/" rel="nofollow">
        Chat with us
      </a>
      , powered by{" "}
      <a
        href="https://www.livechat.com/?welcome"
        rel="noopener nofollow"
        target="_blank"
      >
        LiveChat
      </a>
    </noscript>
  );
};

export default LiveChat;
