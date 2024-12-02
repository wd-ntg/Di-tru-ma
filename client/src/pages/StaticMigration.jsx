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

function StaticMigration() {
    const { toast } = useToast();
    const [result, setResult] = useState(null);
    const [code, setCode] = useState(null);
    const [openFibonacci, setOpenFibonacci] = useState(false);
    const [openFactorial, setOpenFactor] = useState(false);
    const [openPrime, setOpenPrime] = useState(false);
    const [numberFibonacci, setNumberFibonacci] = useState(null);
    const [functionCode, setFunctionCode] = useState(null);
    const [dataApi, setDataApi] = useState(null);
  
    const fetchCodeFibonacci = async () => {
      try {
        const response = await fetchApiPostRequest("/caculator/fibonacci"); // Gọi API
  
        setCode(response.data); // Lưu mã hàm trả về từ server
        setDataApi(response); // Lưu thông tin của hàm
        setOpenFibonacci(true); // Mở cửa sổ Dialog
  
        // Chuyển mã nhận được từ chuỗi thành một hàm thực thi
        const parsedFunction = new Function(`return (${response.data})`)();
  
        console.log(parsedFunction);
        setFunctionCode(() => parsedFunction); // Lưu hàm Fibonacci đã chuyển
  
        toast({
          title: "Thông báo",
          description: response.message,
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
        const response = await fetchApiPostRequest("/caculator/factorial");
  
        setCode(response.data);
        setDataApi(response);
        setOpenFactor(true);
  
        const parsedFunction = new Function(`return (${response.data})`)();
  
        console.log(parsedFunction);
        setFunctionCode(() => parsedFunction);
  
        toast({
          title: "Thông báo",
          description: response.message,
          action: (
            <ToastAction altText="Goto schedule to undo">Quay lại</ToastAction>
          ),
        });
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
  
    const caculatorFunction = () => {
      if (!functionCode || numberFibonacci === null) {
        console.error("Hàm hoặc số đầu vào chưa sẵn sàng.");
        return;
      }
  
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
      const calculatedResult = functionCode(parseInt(numberFibonacci, 10));
  
      setResult(calculatedResult); // Cập nhật kết quả tính toán
      console.log(calculatedResult);
    };
    const caculatorFunctionPrime = () => {
      if (!functionCode || numberFibonacci === null) {
        console.error("Hàm hoặc số đầu vào chưa sẵn sàng.");
        return;
      }
  
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
      const calculatedResult = functionCode(parseInt(numberFibonacci, 10));
  
      const resultFomat = calculatedResult.map((item) => `"${item}"`).join(", ");
  
      setResult(resultFomat); // Cập nhật kết quả tính toán
    };
  
    const fetchCodePrimeNumbers = async () => {
      try {
        const response = await fetchApiPostRequest("/caculator/primenumbers");
  
        // Gán mã nhận được từ server
        setCode(response.data);
        setDataApi(response);
        setOpenPrime(true);
  
        // Parse hàm từ chuỗi nhận được
        const parsedFunction = new Function(`return (${response.data})`)();
  
        // Lưu hàm vào state để sử dụng sau
        setFunctionCode(() => parsedFunction);
  
        // Hiển thị thông báo
        toast({
          title: "Thông báo",
          description: response.message,
          action: (
            <ToastAction altText="Goto schedule to undo">Quay lại</ToastAction>
          ),
        });
      } catch (error) {
        console.error("Error fetching code:", error);
      }
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
                      Hàm {dataApi?.name} nhận từ server
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
                  <Button onClick={caculatorFunction} type="submit">
                    Tính
                  </Button>{" "}
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
                      Hàm {dataApi?.name} nhận từ server
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
                  <Button onClick={caculatorFunction} type="submit">
                    Tính
                  </Button>{" "}
                  {/* Gọi hàm tính Fibonacci */}
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  fetchCodePrimeNumbers()
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
                      Hàm {dataApi?.name} nhận từ server
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

export default StaticMigration