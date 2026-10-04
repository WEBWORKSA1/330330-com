/* 330330.com — site configuration. Edit values here; nothing else needs to change to switch on revenue features. */
window.SITE = {
  name: "330330",
  tagline: "The Miss-You Hub · 想想你",
  baseUrl: "https://330330.com",
  interestUrl: "https://web.works/contact",

  /* Single inbox for ALL forms. Stored as reversed-order, reversed-text base64 chunks so it never appears in page
     text or source. Decoded only at submit time. Do not paste a plain address anywhere in the site. */
  inbox: ["iV2d", "y92d", "hN3a", "nBUM", "pFWb", "j5Cb", "=02b"],
  /* After the first form submission FormSubmit emails a one-time activation link. Once activated you can paste the
     random alias it gives you here (and set inboxIsAlias: true) for an extra layer of privacy. */
  inboxAlias: "",
  inboxIsAlias: false,

  /* Google AdSense — paste your publisher id (e.g. "ca-pub-1234567890123456") to switch ads on site-wide.
     Leave empty and tasteful "Advertise here" house ads show instead. Also update /ads.txt. */
  adsenseClient: "",
  adSlots: { top: "", infeed: "", sidebar: "", footer: "" },

  /* Affiliate settings. amazonTag is appended to every gift link (e.g. "yourtag-20"). */
  affiliates: {
    amazonTag: "",
    amazonDomain: "www.amazon.com",
    flowers: "",   /* your flower-delivery affiliate URL; empty = generic search */
    esim: "",      /* travel eSIM affiliate URL */
    flights: "",   /* flight/hotel affiliate URL */
    tutors: ""     /* Mandarin tutoring affiliate URL */
  },

  /* Donations — paste any payment link to show its button. Empty = button hidden; pledge form always works. */
  donate: {
    paypal: "",        /* https://www.paypal.com/donate/?hosted_button_id=XXXX */
    kofi: "",          /* https://ko-fi.com/yourname */
    buymeacoffee: "",  /* https://buymeacoffee.com/yourname */
    stripe: ""         /* https://buy.stripe.com/XXXX */
  },
  fundingGoal: { label: "2027 Miss-You Season Fund", goal: 3300, raised: 0, supporters: 0 },

  /* YouTube — set your channel URL to show Subscribe buttons. Add verified video IDs to embed them. */
  youtubeChannel: "",
  videos: [ /* { id: "VIDEO_ID", title: "Title", channel: "Channel" } */ ],

  contest: {
    name: "The 330 Miss-You Letter Contest",
    opens: "2026-10-04T00:00:00+08:00",
    closes: "2027-08-08T23:59:00+08:00", /* Qixi 2027 = Aug 8, 2027 */
    prizes: [
      { place: "Grand Prize", prize: "US$330 + featured on the homepage for a year" },
      { place: "2 Runners-up", prize: "US$33 each + winner badge" },
      { place: "10 Honourable mentions", prize: "Featured on the Miss-You Wall" }
    ]
  }
};
