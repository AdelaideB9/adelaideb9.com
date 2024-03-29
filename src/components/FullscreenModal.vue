<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  confirmButtonText: {
    type: String,
    default: "Confirm",
  },
  confirmButtonClasses: {
    type: Array,
    default: () => ["bg-light-carmine"],
  },
  cancelButtonText: {
    type: String,
    default: "Cancel",
  },
  action: {
    type: Function,
    default: null,
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-center justify-center min-h-screen px-4 text-center">
      <div
        class="fixed inset-0 bg-black/50 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="close"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="bg-primary text-inherit inline-block align-bottom rounded text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start gap-4">
            <div
              v-if="showIcon"
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white shadow sm:mx-0 sm:h-10 sm:w-10"
            >
              <!-- Heroicon name: outline/exclamation -->
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 id="modal-title" class="text-lg leading-6 font-medium">
                {{ title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm">
                  <slot></slot>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            v-if="action != null"
            class="w-full inline-flex justify-center sm:ml-3 sm:w-auto"
            :class="confirmButtonClasses"
            @click="
              action();
              close();
            "
          >
            {{ confirmButtonText }}
          </button>
          <div v-if="action != null" class="h-2"></div>
          <button
            class="w-full inline-flex justify-center px-4 py-2 sm:mt-0 sm:ml-3 sm:w-auto"
            @click="close"
          >
            {{
              action == null && cancelButtonText == "Cancel"
                ? "OK"
                : cancelButtonText
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
