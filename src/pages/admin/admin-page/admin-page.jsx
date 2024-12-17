import {
    AdminList,
    NewAdminForm,
    PageHeader,
    Spacer,
} from "../../../components/components";
import { useSelector } from "react-redux";

const AdminPage = () => {
    const { currentOperation } = useSelector((state) => state.misc);

    return (
        <>
            <PageHeader />
            {currentOperation === "new" && (
                <>
                    <Spacer />
                    <NewAdminForm />
                </>
            )}
            <Spacer />
            <AdminList />
            <Spacer />
        </>
    );
};

export default AdminPage;
