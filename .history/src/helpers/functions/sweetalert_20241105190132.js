import Swal from "sweetalert2";

export const swalQuestion = (title, text) => {
    return Swal.fire({
        title,
        text,
        icon: "question",
        showCancelButton: true,
    });
};

export const swalToast = (title, icon = "info", timer = 4000) => {
    return Swal.fire({
        icon, // success, error, warning, info, question
        title,
        timer,
        showConfirmButton: false,
    });
};
