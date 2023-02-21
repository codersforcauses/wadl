import { ref } from "vue";
import { handleError } from "../misc/firebaseHelpers";

class NotificationModalHelper {
  #isVisible = ref(false);
  get isVisible() {
    return this.#isVisible.value;
  }

  #isSuccess = ref(false);
  get isSuccess() {
    return this.#isSuccess.value;
  }

  #message = ref("");
  get message() {
    return this.#message.value;
  }

  dismiss() {
    this.#isVisible.value = false;
    this.#isSuccess.value = false;
    this.#message.value = "";
  }

  notifyError(error) {
    this.#isVisible.value = false;

    this.#message.value = handleError(error);
    this.#isSuccess.value = false;
    this.#isVisible.value = true;
  }

  notifySuccess(message) {
    this.#isVisible.value = false;
    this.#message.value = message;
    this.#isSuccess.value = true;
    this.#isVisible.value = true;
  }
}

export default function () {
  return new NotificationModalHelper();
}
