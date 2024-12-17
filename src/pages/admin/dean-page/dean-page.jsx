import { useSelector } from "react-redux";
import {
    DeanList,
    EditDeanForm,
    NewDeanForm,
    PageHeader,
    Spacer,
} from "../../../components/components";

const DeanPage = () => {
    const { currentOperation } = useSelector((state) => state.misc);

    const content = () => {
        switch (currentOperation) {
            case "newDean":
                return (
                    <>
                        <Spacer />
                        <NewDeanForm />
                    </>
                );
            case "editDean":
                return (
                    <>
                        <Spacer />
                        <EditDeanForm />
                    </>
                );
            default:
                return <></>;
        }
    };

    return (
        <>
            <PageHeader />
            {content()}
            <Spacer />
            <DeanList />
            <Spacer />
        </>
    );
};

export default DeanPage;
