import { useState, useEffect } from "react";
import "../App.css";
import { fetchApiPostRequest } from "../service/fetchApi"; // Giữ nguyên hoặc sửa thành GET request nếu cần.

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

var codeFibonacci = null;
var codeFactorial = null;
var codePrime = null;

function DynamicMigration() {
  const { toast } = useToast();
  const [result, setResult] = useState(null);
  const [code, setCode] = useState(null);
  const [openFibonacci, setOpenFibonacci] = useState(false);
  const [openFactorial, setOpenFactor] = useState(false);
  const [openPrime, setOpenPrime] = useState(false);
  const [numberFibonacci, setNumberFibonacci] = useState(null);
  const [functionCode, setFunctionCode] = useState(null);

  const fetchCodeFibonacci = async () => {
    try {
      const { fibonacci } = await import(
        "http://localhost:5000/models/getFibonacci.js"
      );

      codeFibonacci = fibonacci;

      setCode(codeFibonacci.toString());

      console.log(codeFibonacci(10));

      setOpenFibonacci(true);

      toast({
        title: "Thông báo",
        description: "Đã nhận được hàm Fibonacci từ server",
        action: (
          <ToastAction altText="Goto schedule to undo">Quay lại</ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error fetching code:", error);
    }
  };

  const fetchCodeFactorial = async () => {
    try {
      const { factorial } = await import(
        "http://localhost:5000/models/getFactorial.js"
      );

      codeFactorial = factorial;
      setCode(codeFactorial.toString());
      setOpenFactor(true);

      toast({
        title: "Thông báo",
        description: "Đã nhận được hàm tính giai thừa từ server",
        action: (
          <ToastAction altText="Goto schedule to undo">Quay lại</ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error fetching code:", error);
    }
  };

  const fetchCodePrimeNumbers = async () => {
    try {
      const { primeNumbers } = await import(
        "http://localhost:5000/models/getPrimeNumbers.js"
      );

      codePrime = primeNumbers;
      console.log(codePrime)
      setCode(codePrime.toString());
      setOpenPrime(true);

      toast({
        title: "Thông báo",
        description: "Đã nhận được hàm hiển thị danh sách số nguyên tố từ server",
        action: (
          <ToastAction altText="Goto schedule to undo">Quay lại</ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error fetching code:", error);
    }
  };

  const caculatorFunctionPrime = () => {

    if (numberFibonacci < 2 || numberFibonacci == null) {
      toast({
        title: "Thông báo",
        description: "Vui lóg nhập số lớn hơn 1",
        action: (
          <ToastAction altText="Goto schedule to undo">Quay lại</ToastAction>
        ),
      });
      return;
    }

    // Thực thi hàm Fibonacci với đầu vào là số người dùng nhập
    const calculatedResult = codePrime(parseInt(numberFibonacci, 10));

    const resultFomat = calculatedResult.map((item) => `"${item}"`).join(", ");

    setResult(resultFomat); // Cập nhật kết quả tính toán
  };

  useEffect(() => {}, []);

  return (
    <div
      className="text-white"
      style={{ padding: "20px", fontFamily: "Arial" }}
    >
      {/* <h1>Migrate Code Simulation</h1> */}
      <h1>Mô phỏng di trú mã</h1>
      <div className="space-x-4 my-6">
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                fetchCodeFibonacci();
                setResult(null);
              }} // Khi nhấn nút, gọi hàm fetchCodeFibonacci
              className="border-2 rounded-md  border-solid p-2 hover:border-[#646cff]"
            >
              Fibonacci
            </button>
          </DialogTrigger>
          {openFibonacci && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Phiếu nhập thông tin</DialogTitle>
                <DialogDescription>Điền số để tính Fibonacci</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Hàm Fibonacci nhận từ server
                  </Label>
                  <div>{codeFibonacci.toString()}</div> {/* Hiển thị mã hàm từ server */}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Số cần tìm
                  </Label>
                  <input
                    id="name"
                    className="col-span-3 bg-white p-4"
                    type="number"
                    min={2}
                    value={numberFibonacci}
                    onChange={(e) => setNumberFibonacci(e.target.value)} // Cập nhật số Fibonacci
                  />
                </div>
                <div>Kết quả: {result}</div> {/* Hiển thị kết quả */}
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setResult(codeFibonacci(parseInt(numberFibonacci, 10)))}
                  type="submit"
                >
                  Tính
                </Button>

                {/* Gọi hàm tính Fibonacci */}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                fetchCodeFactorial();
                setResult(null);
              }} // Khi nhấn nút, gọi hàm fetchCodeFibonacci
              className="border-2 rounded-md  border-solid p-2 hover:border-[#646cff]"
            >
              Tính giai thừa
            </button>
          </DialogTrigger>
          {openFactorial && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Phiếu nhập thông tin</DialogTitle>
                <DialogDescription>Điền số để tính Factorial</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Hàm tính giai thừa nhận từ server
                  </Label>
                  <div>{codeFactorial.toString()}</div> {/* Hiển thị mã hàm từ server */}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Số cần tìm
                  </Label>
                  <input
                    id="name"
                    className="col-span-3 bg-white p-4"
                    type="number"
                    min={2}
                    value={numberFibonacci}
                    onChange={(e) => setNumberFibonacci(e.target.value)} // Cập nhật số Fibonacci
                  />
                </div>
                <div>Kết quả: {result}</div> {/* Hiển thị kết quả */}
              </div>
              <DialogFooter>
                <Button
                 onClick={() => setResult(codeFactorial(parseInt(numberFibonacci, 10)))}

                  type="submit"
                >
                  Tính
                </Button>

                {/* Gọi hàm tính Fibonacci */}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                fetchCodePrimeNumbers();
                setResult(null);
              }} // Khi nhấn nút, gọi hàm fetchCodeFibonacci
              className="border-2 rounded-md  border-solid p-2 hover:border-[#646cff]"
            >
              Tìm danh sách số nguyên tố
            </button>
          </DialogTrigger>
          {openPrime && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Phiếu nhập thông tin</DialogTitle>
                <DialogDescription>Điền số để tính Factorial</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Hàm tính số nguyên tố nhận từ server
                  </Label>
                  <div>{code}</div> {/* Hiển thị mã hàm từ server */}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Số cần tìm
                  </Label>
                  <input
                    id="name"
                    className="col-span-3 bg-white p-4"
                    type="number"
                    min={2}
                    value={numberFibonacci}
                    onChange={(e) => setNumberFibonacci(e.target.value)} // Cập nhật số Fibonacci
                  />
                </div>
                <div>Kết quả: {result}</div> {/* Hiển thị kết quả */}
              </div>
              <DialogFooter>
                <Button onClick={caculatorFunctionPrime} type="submit">
                  Tính
                </Button>{" "}
                {/* Gọi hàm tính Fibonacci */}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <p>Hàm được gửi từ Server:</p>
      <pre
        className="text-black"
        style={{ background: "#f4f4f4", padding: "10px" }}
      >
        {code} {/* Hiển thị mã hàm Fibonacci nhận được từ server */}
      </pre>
      <h2 className="my-4">Kết quả tính toán: {result}</h2>{" "}
      {/* Hiển thị kết quả tính Fibonacci */}
    </div>
  );
}

export default DynamicMigration;
