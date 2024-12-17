import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getAllContactMessagesByPage } from "../../../../api/api";

const ContactMessageList = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });

    const onPage = (event) => {
        setLazyState(event);
    };

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await getAllContactMessagesByPage(
                page,
                lazyState.rows
            );
            setMessages(response.data.content);
            setTotalRows(response.data.totalElements);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(lazyState.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lazyState]);

    return (
        <Container className="contact-message-list-container">
            <Card>
                <Card.Body>
                    <Card.Title>Contact Message List</Card.Title>
                    <DataTable
                        value={messages}
                        lazy
                        dataKey={() => Math.random()}
                        paginator
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRows}
                        onPage={onPage}
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows>
                        <Column field="name" header="Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="date" header="Date"></Column>
                        <Column field="subject" header="Subject"></Column>
                        <Column field="message" header="Message"></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ContactMessageList;
