<!-- ConfirmationDialog.vue -->

<template>
    <div v-if="isDialogVisible">
        <!-- Overlay to cover the entire screen -->
        <div class="overlay"></div>
        <!-- Modal for the confirmation dialog -->
        <div class="modal">
            <div class="modal-content">
                <!-- Display the confirmation message -->
                <p>{{ message }}</p>
                <!-- Buttons for confirming or canceling the action -->
                <div class="buttons">
                    <button @click="confirmAction" class="bg-red-700 disabled:opacity-50 text-white rounded">Yes</button>
                    <button @click="cancelAction"  class="bg-green-700 disabled:opacity-50 text-white rounded">No</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        message: {
            type: String,
            default: "Are you sure?", // Default confirmation message
        },
    },
    data() {
        return {
            isDialogVisible: false, // Flag to control the visibility of the dialog
        };
    },
    methods: {
        // Method to emit the 'confirm' event and hide the dialog
        confirmAction() {
            this.$emit("confirm");
            this.hide();
        },
        // Method to emit the 'cancel' event and hide the dialog
        cancelAction() {
            this.$emit("cancel");
            this.hide();
        },
        // Method to show the dialog
        show() {
            this.isDialogVisible = true;
        },
        // Method to hide the dialog
        hide() {
            this.isDialogVisible = false;
        },
    },
};
</script>

<style scoped>
/* Overlay style */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

/* Modal style */
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.modal-content {
    text-align: center;
}

/* Buttons style */
.buttons {
    margin-top: 20px;
}

button {
    margin: 0 10px;
    padding: 8px 16px;
    cursor: pointer;
}
</style>