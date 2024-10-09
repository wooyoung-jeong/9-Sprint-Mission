import { useState } from "react";
import styles from "@/components/ImageUpload.module.css";
import Image from "next/image";
import plusIcon from "@/public/assets/ic_plus.svg";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.fileInputContainer}>
      <label className={styles.fileInputLabel} htmlFor="fileInput">
        {imageSrc ? (
          <Image fill src={imageSrc} alt="이미지 미리 보기" />
        ) : (
          <div className={styles.labelWrap}>
            <div className={styles.image}>
              <Image fill src={plusIcon} alt="이미지" />
            </div>
            <p className={styles.labelText}>이미지 등록</p>
          </div>
        )}
      </label>
      <input
        className={styles.input}
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUpload;
