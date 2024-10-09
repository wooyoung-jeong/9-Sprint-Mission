import styles from "@/styles/DetailBoard.module.css";
import axios from "@/lib/axios";
import { useState } from "react";
import kebabIcon from "@/public/assets/ic_kebab.svg";
import Image from "next/image";
import profile from "@/public/assets/profile.svg";
import formatDate from "@/lib/formatDate";
import CommentItem from "@/components/CommentItem";
import Link from "next/link";
import emptyImage from "@/public/assets/Img_reply_empty.svg";

interface Writer {
  id: number; // 작성자 ID
  nickname: string; // 작성자 닉네임
  image?: string;
}

export interface DetailBoard {
  id: number; // 게시글 ID
  title: string; // 게시글 제목
  content: string; // 게시글 내용
  image: string; // 게시글 이미지 URL
  likeCount: number; // 좋아요 수
  createdAt: string; // 게시글 생성 날짜
  updatedAt: string; // 게시글 수정 날짜
  writer: Writer; // 작성자 정보
  isLiked: boolean;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  try {
    const detailBoardRes = await axios.get(`articles/${id}`);
    const detailBoard = detailBoardRes.data;

    const commentsRes = await axios.get(`articles/${id}/comments?limit=10`);
    const comments = commentsRes.data.list;

    return {
      props: {
        detailBoard,
        comments,
      },
    };
  } catch (error) {
    console.log("error= " + error);

    return {
      props: {
        detailBoard: null,
        comments: [],
      },
    };
  }
}

export default function DetailBoard({
  detailBoard,
  comments,
}: {
  detailBoard: DetailBoard;
  comments: Comment[];
}) {
  const [newComment, setNewComment] = useState("");

  const InputComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <main>
      <section className={styles.container}>
        <div className={styles.titleWrap}>
          <h2>{detailBoard?.title}</h2>
          <button className={styles.moreButton}>
            <Image src={kebabIcon} alt="더 보기" />
          </button>
        </div>
        <div className={styles.profileWrap}>
          <div className={styles.profileImage}>
            <Image fill src={profile} alt="프로필" />
          </div>
          <div className={styles.nameDateWrap}>
            <p className={styles.nickName}>{detailBoard?.writer.nickname}</p>
            <p className={styles.date}>
              {detailBoard?.updatedAt
                ? formatDate(detailBoard.updatedAt)
                : detailBoard?.createdAt}
            </p>
          </div>
          <div className={styles.likeButtonWrap}>
            <button className={styles.likeButton}>
              ♡ {detailBoard?.likeCount}
            </button>
          </div>
        </div>
        <p className={styles.content}>{detailBoard?.content}</p>
        <form className={styles.commentForm}>
          <label className={styles.inputLabel} htmlFor="inputText">
            댓글달기
          </label>
          <textarea
            value={newComment}
            className={styles.inputText}
            id="inputText"
            name="inputText"
            placeholder="댓글을 입력해주세요."
            onChange={InputComment}
          />
          <div className={styles.registButtonWrap}>
            <button className={styles.registButton} disabled={!newComment}>
              등록
            </button>
          </div>
        </form>
        <ul className={styles.commentsList}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <div className={styles.emptyToast}>
              <div className={styles.emptyImage}>
                <Image fill src={emptyImage} alt="코멘트 없음" />
              </div>
              <p className={styles.emptyText}>
                아직 댓글이 없어요,
                <br /> 지금 댓글을 달아보세요!
              </p>
            </div>
          )}
        </ul>
        <div className={styles.returnListButtonWrap}>
          <Link className={styles.returnListButton} href="/boards">
            목록으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
