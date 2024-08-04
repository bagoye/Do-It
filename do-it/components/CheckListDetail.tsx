import { FC, useState } from "react";
import { uploadImage } from '@/utils/api'; // 이미지 업로드 함수 추가

interface CheckListItem {
  id: string;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
}

interface CheckListDetailProps {
  item: CheckListItem;
  onUpdate: (data: any) => void;
  onDelete: () => void;
}

const CheckListDetail: FC<CheckListDetailProps> = ({
  item,
  onUpdate,
  onDelete,
}) => {
  const [name, setName] = useState(item.name);
  const [memo, setMemo] = useState(item.memo || "");
  const [imageUrl, setImageUrl] = useState(item.imageUrl || "");
  const [previewImage, setPreviewImage] = useState<string | null>(null); // 미리보기 이미지 상태 추가
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택된 파일 상태 추가

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMemo(e.target.value);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    let uploadedImageUrl = imageUrl;
    if (selectedFile) {
      const uploadedImage = await uploadImage(selectedFile);
      uploadedImageUrl = uploadedImage.url;
    }
    onUpdate({ name, memo, imageUrl: uploadedImageUrl });
    setImageUrl(uploadedImageUrl); // 이미지 URL 상태 업데이트
    setSelectedFile(null); // 선택된 파일 초기화
  };

  const handleToggleComplete = () => {
    onUpdate({ isCompleted: !item.isCompleted });
  };

  return (
    <div className="checklist-detail">
      <div className="task-name-section">
        <img
          src={item.isCompleted ? "/check2.png" : "/check1.png"}
          alt="Check"
          onClick={handleToggleComplete}
          className="detail-check-icon"
        />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className={item.isCompleted ? "completed" : ""}
        />
      </div>
      <div className="memo-section">
        <div className="image-upload">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="preview-image" />
          ) : imageUrl ? (
            <img src={imageUrl} alt="Item" className="preview-image" />
          ) : (
            <img src="/add.png" alt="Add" className="default-image" />
          )}
          <label>
            <input type="file" onChange={handleImageChange} />
            <img src={imageUrl || previewImage ? "/img_edit.png" : "/add2.png"} alt="Add/Edit" className="edit-icon" />
          </label>
        </div>
        <div className="memo-input">
          <div className="memo-text">Memo</div>
          <textarea value={memo} onChange={handleMemoChange}></textarea>
        </div>
      </div>
      <div className="action-buttons">
        <img src="/edit.png" alt="수정 완료" onClick={handleSave} />
        <img src="/delete.png" alt="삭제하기" onClick={onDelete} />
      </div>
    </div>
  );
};

export default CheckListDetail;
