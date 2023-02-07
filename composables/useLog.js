import { useNuxtApp } from "#imports";
import { logEvent } from "firebase/analytics";

export default function LoggingHelper() {
  const { $clientAnalytics } = useNuxtApp();
  function event(message) {
    console.log(message);
    logEvent($clientAnalytics, message);
  }
  return { event };
}
