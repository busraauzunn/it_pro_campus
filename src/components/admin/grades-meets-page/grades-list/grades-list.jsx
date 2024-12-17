import React, { useEffect, useState } from "react";
import { getAllStudentInfoForStudentByPage } from "../../../../api/api";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const GradesList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await getAllStudentInfoForStudentByPage(
                page,
                lazyState.rows
            );
            setList(response.data.content);
            setTotalRows(response.data.totalElements);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onPage = (event) => setlazyState(event);

    const averageTemplate = (row) => row.average.toFixed(2);

    useEffect(() => {
        loadData(lazyState.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lazyState]);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Grades List</Card.Title>

                    <DataTable
                        value={list}
                        lazy
                        dataKey="studentInfoId"
                        paginator
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRows}
                        onPage={onPage}
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows>
                        <Column header="Lesson" field="lessonName"></Column>
                        <Column header="Absentee" field="absentee"></Column>
                        <Column header="Midterm" field="midtermExam"></Column>
                        <Column header="Final" field="finalExam"></Column>
                        <Column header="Note" field="note"></Column>
                        <Column header="Info" field="infoNote"></Column>
                        <Column
                            header="Average"
                            body={averageTemplate}></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default GradesList;
