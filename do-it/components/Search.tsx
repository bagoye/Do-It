import React from "react";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  name: string;
};

const Search: FC<{ onAdd: (name: string) => void; hasItems: boolean }> = ({
  onAdd,
  hasItems,
}) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await onAdd(data.name);
      console.log("할 일이 성공적으로 추가되었습니다.");
      reset(); // 입력 필드를 초기화합니다.
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "할 일 추가 중 오류가 발생했습니다:",
          error.response?.data || error.message
        );
      } else {
        console.error("할 일 추가 중 오류가 발생했습니다:", error);
      }
    }
  };

  const buttonStyle = hasItems ? {} : { backgroundColor: 'rgba(124, 58, 237, 1)', color: '#FFFFFF' };

  return (
    <form className="search-container" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        className="search-input"
        {...register("name", { required: true })}
      />
      <button type="submit" className="add-button" style={buttonStyle}>
        + 추가하기
      </button>
    </form>
  );
};

export default Search;
