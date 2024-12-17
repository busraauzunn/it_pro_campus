import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteLessonProgram,
    getLessonProgramsByPage,
} from "../../../../api/lesson-programs/lesson-programs";
import { functions } from "../../../../helpers/helpers";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { Button, Card, Container } from "react-bootstrap";
import { FiTrash } from "react-icons/fi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const LessonProgramList = () => {
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
    const { listRefreshToken } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await getLessonProgramsByPage(
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
                "Are you sure you want to delete this lesson program?"
            )
            .then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    try {
                        const response = await deleteLessonProgram(id);
                        dispatch(setListRefreshToken(Math.random()));
                        dispatch(setCurrentOperation(null));
                        functions.swalToast(
                            `${response.data.message}`,
                            "success"
                        );
                    } catch (error) {
                        functions.swalToast(
                            "There was an error deleting this lesson program",
                            "error"
                        );
                    } finally {
                        setLoading(false);
                    }
                }
            });
    };

    const onPage = (event) => setLazyState(event);

    const operationTemplate = (row) => {
        if (row.built_in) return null;
        return (
            <div className="flex">
                <Button
                    className="btn-link"
                    onClick={() => handleDelete(row.lessonProgramId)}>
                    <FiTrash />
                </Button>
            </div>
        );
    };

    const lessonNameTemplate = (row) =>
        row.lessonName.map((item) => item.lessonName).join("-");

    useEffect(() => {
        loadData(lazyState.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listRefreshToken, lazyState]);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        Lesson Programs
                        <Button
                            onClick={() =>
                                dispatch(
                                    setCurrentOperation("newLessonProgram")
                                )
                            }>
                            New Lesson Program
                        </Button>
                    </Card.Title>

                    <DataTable
                        value={list}
                        lazy
                        dataKey="lessonProgramId"
                        paginator
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRows}
                        onPage={onPage}
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows>
                        <Column
                            body={lessonNameTemplate}
                            header="Lesson"></Column>
                        <Column field="day" header="Day"></Column>
                        <Column field="startTime" header="Start Time"></Column>
                        <Column field="stopTime" header="End Time"></Column>
                        <Column
                            headerStyle={{ width: "2rem" }}
                            body={operationTemplate}></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LessonProgramList;
