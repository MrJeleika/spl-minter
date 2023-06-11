import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { StyledInput } from "../Input/Input";
import { StyledButton } from "../Button/Button";
import { FormTitle, StyledTitle } from "../Title/Title";
import { createToken } from "../../../utils/createToken";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Loading } from "../Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setMintingStatus } from "@/redux/slice/appSlice";
import { useEffect } from "react";
import styled from "styled-components";

export const TokenForm = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const { mintingStatus } = useAppSelector((state) => state.app);

  const Form = styled.form`
    margin-bottom: 70px;
  `;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(setMintingStatus("minting"));
    const res = await createToken(connection, publicKey!, sendTransaction, wallet, data);
    dispatch(setMintingStatus(res));
    setTimeout(() => dispatch(setMintingStatus("none")), 7000);
  };
  return (
    <>
      <FormTitle $margin="0px 0px 40px 0px">SPL-TOKEN CREATOR</FormTitle>
      <Loading $status={mintingStatus} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledTitle>Token name:</StyledTitle>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <StyledInput
              $error={Boolean(errors.name)}
              {...field}
              type="text"
              {...register("name", {
                required: "Введіть",
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9\s\S]{0,}$/,
                  message: "noBro",
                },
              })}
              className="no-autofill-bkg"
            />
          )}
        />
        <StyledTitle>Token symbol:</StyledTitle>
        <Controller
          name="symbol"
          control={control}
          render={({ field }) => (
            <StyledInput
              $error={Boolean(errors.symbol)}
              placeholder="Up to 10 characters"
              {...field}
              type="text"
              {...register("symbol", {
                required: "Введіть",
                maxLength: 10,
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9]*$/,
                  message: "noBro",
                },
              })}
              className="no-autofill-bkg"
            />
          )}
        />
        <StyledTitle>Token Description:</StyledTitle>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <StyledInput
              $error={Boolean(errors.description)}
              placeholder=""
              type="text"
              {...field}
              {...register("description", {
                required: "Введіть",
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9\s\S]{0,}$/,
                  message: "noBro",
                },
              })}
              className="no-autofill-bkg"
            />
          )}
        />
        <StyledTitle>Token Image:</StyledTitle>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <StyledInput
              $error={Boolean(errors.image)}
              placeholder="Image url"
              type="text"
              {...field}
              {...register("image", {
                required: "Введіть",
              })}
              className="no-autofill-bkg"
            />
          )}
        />

        <StyledTitle>Amount:</StyledTitle>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <StyledInput
              $error={Boolean(errors.amount)}
              type="number"
              placeholder="1 - 100.000.000.000.000.000"
              {...field}
              {...register("amount", {
                required: "Введіть",
                min: {
                  value: 1,
                  message: "Number must be greater than or equal to 1",
                },
                max: {
                  value: 100000000000000000,
                  message: "Number must be less than or equal to 1,000,000,000",
                },
              })}
              className="no-autofill-bkg"
            />
          )}
        />
        <StyledButton type="submit">Create</StyledButton>
      </Form>
    </>
  );
};
