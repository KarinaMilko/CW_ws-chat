import { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import {
  getMessagesThunk,
  newMessagePending,
  deleteMessageSuccess,
} from "./store/slices/messagesSlice";
import styles from "./App.module.css";
import { connect } from "react-redux";
import { ws } from "./api";

function App({
  messages,
  isFetching,
  error,
  limit,
  get,
  fetching,
  onDeleteMessage,
}) {
  const scrollTo = useRef(null);

  useEffect(() => {
    get(limit);
  }, [limit]);

  const addMessage = (values, formikBag) => {
    ws.createMessage(values);
    fetching();
    formikBag.resetForm();
  };

  const handleDelete = (id) => {
    ws.deleteMessage(id);
    onDeleteMessage(id);
  };

  useEffect(() => {
    scrollTo?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <article
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <section style={{ overflowY: "auto" }}>
        <ul>
          {messages.map((m) => (
            <li key={m._id} className={styles.messageItem}>
              <p>{m._id}</p>
              <p>{m.body}</p>
              <p>{m.createdAt}</p>
              <button onClick={() => handleDelete(m._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div ref={scrollTo} style={{ height: "20px" }}>
          {error && <div style={{ color: "red" }}>ERROR!!!</div>}
          {isFetching && <div>Messages is loading. Please, wait...</div>}
        </div>
      </section>
      <section className={styles.formContainer} style={{ marginTop: "auto" }}>
        <Formik initialValues={{ body: "" }} onSubmit={addMessage}>
          <Form>
            <Field name="body"></Field>
            <button type="submit">Send</button>
            <button onClick={() => onDelete(m._id)}>Delete</button>
          </Form>
        </Formik>
      </section>
    </article>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = (dispatch) => ({
  get: (limit) => dispatch(getMessagesThunk(limit)),
  fetching: () => dispatch(newMessagePending()),
  onDeleteMessage: (id) => dispatch(deleteMessageSuccess(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
