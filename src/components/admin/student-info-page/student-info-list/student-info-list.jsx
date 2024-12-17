import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentOperation,
    setCurrentRecord,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { functions } from "../../../../helpers/helpers";
import {
    deleteStudentInfo,
    getAllStudentInfoForTeacherByPage,
} from "../../../../api/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const StudentInfoList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });
    const dispatch = useDispatch();
    const { listRefreshToken } = useSelector((state) => state.misc);

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await getAllStudentInfoForTeacherByPage(
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

    const handleDelete = async (id) => {
        functions
            .swalQuestion(
                "Are you sure you want to delete this student information?"
            )
            .then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    try {
                        const response = await deleteStudentInfo(id);
                        dispatch(setListRefreshToken(Math.random()));
                        dispatch(setCurrentOperation(null));
                        functions.swalToast(
                            `${response.data.message}`,
                            "success"
                        );
                    } catch (error) {
                        functions.swalToast(
                            "There was an error deleting this student information",
                            "error"
                        );
                    } finally {
                        setLoading(false);
                    }
                }
            });
    };

    const onPage = (event) => setLazyState(event);

    const handleEdit = (meeting) => {
        dispatch(setCurrentOperation("editStudentInfo"));
        dispatch(setCurrentRecord(meeting));
    };

    const operationTemplate = (row) => {
        if (row.built_in) return null;
        return (
            <div className="d-flex">
                <Button className="btn-link" onClick={() => handleEdit(row)}>
                    <FiEdit />
                </Button>
                <Button
                    className="btn-link"
                    onClick={() => handleDelete(row.userId)}>
                    <FiTrash />
                </Button>
            </div>
        );
    };

    const averageTemplate = (row) => row.average.toFixed(2);

    const nameTemplate = (row) => {
        const { name, surname } = row.studentResponse;
        return `${name} ${surname}`;
    };

    useEffect(() => {
        loadData(lazyState.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lazyState, listRefreshToken]);

    return (
        <Container className="student-info-list-container">
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        Student Information List{" "}
                        <Button
                            onClick={() =>
                                dispatch(setCurrentOperation("newStudentInfo"))
                            }>
                            New Student Information
                        </Button>
                    </Card.Title>
                    <DataTable
                        value={list}
                        lazy
                        dataKey="id"
                        paginator
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRows}
                        onPage={onPage}
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows>
                        <Column header="Student" body={nameTemplate}></Column>
                        <Column field="lessonName" header="Lesson" />
                        <Column field="absentee" header="Absentee" />
                        <Column field="midtermExam" header="Midterm" />
                        <Column field="finalExam" header="Final" />
                        <Column field="note" header="Note" />
                        <Column field="infoNote" header="Info" />
                        <Column header="Average" body={averageTemplate} />
                        <Column
                            headerStyle={{ width: "2rem" }}
                            body={operationTemplate}></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default StudentInfoList;
