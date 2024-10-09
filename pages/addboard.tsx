import ImageUpload from "@/components/ImageUpload";
import styles from "@/styles/addboard.module.css";
import { useState } from "react";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isFormValid = title.trim() !== "" && description.trim() !== "";

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <main>
      <form className={styles.productContainer}>
        <div className={styles.registWrap}>
          <h2 className={styles.registTitle}>상품 등록하기</h2>
          <button
            className={styles.registButton}
            type="submit"
            disabled={!isFormValid}
          >
            등록
          </button>
        </div>
        <div className={styles.inputForm}>
          <div className={styles.inputWrap}>
            <label htmlFor="title">*제목</label>
            <input
              className={styles.titleInput}
              id="title"
              name="title"
              placeholder="제목을 입력해주세요"
              onChange={changeTitle}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="description">*내용</label>
            <textarea
              className={styles.description}
              id="description"
              name="description"
              placeholder="내용을 입력해주세요"
              onChange={changeDescription}
            />
          </div>
          <div className={styles.inputWrap}>
            <p>이미지</p>
            <ImageUpload />
          </div>
        </div>
      </form>
    </main>
  );
}
