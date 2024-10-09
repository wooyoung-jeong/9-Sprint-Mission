import { Comment } from "@/pages/board/[id]";
import Image from "next/image";
import kebabIcon from "@/public/assets/ic_kebab.svg";
import profile from "@/public/assets/profile.svg";
import styles from "@/components/CommentItem.module.css";
import formatDate from "@/lib/formatDate";

interface CommentProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentProps) {
  return (
    <li className={styles.commentList}>
      <div className={styles.contentWrap}>
        <p>{comment.content}</p>
        <button className={styles.moreButton}>
          <Image fill src={kebabIcon} alt="더 보기" />
        </button>
      </div>
      <div className={styles.profileWrap}>
        <div className={styles.profileImage}>
          <Image fill src={comment.writer.image ?? profile} alt="프로필 사진" />
        </div>
        <div className={styles.infoWrap}>
          <p className={styles.nickName}>{comment.writer.nickname}</p>
          <p className={styles.time}>{formatDate(comment.updatedAt)}</p>
        </div>
      </div>
    </li>
  );
}
