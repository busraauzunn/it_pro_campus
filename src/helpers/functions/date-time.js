import moment from "moment/moment";

export const getCurrentDate = () => {
    return moment().format("YYYY-MM-DD");
};

export const formatTime = (time) => moment(time, "HH:mm:ss").format("HH:mm");
