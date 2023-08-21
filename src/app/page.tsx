'use client'
import { useState, useRef } from 'react';
import Image from 'react-bootstrap/Image';
import styles from './page.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Icon } from './components/Icon';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Modal from 'react-bootstrap/Modal';
import html2canvas from 'html2canvas';

interface ThongTinDto {
  FileSrc?: string,
  HoTen?: string,
  MaVi?: string
};
interface ViTriAnhDto {
  translateX: number,
  translateY: number,
  scale: number
};
export default function Home() {
  const sectionThuMoiRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [thongTin, setThongTin] = useState<ThongTinDto>({
    FileSrc: "./avt.jpeg",
    HoTen: "",
    MaVi: ""
  });
  const [viTriAnh, setViTriAnh] = useState<ViTriAnhDto>({
    translateX: 0,
    translateY: 0,
    scale: 1
  });
  const anhStyle = {
    transform: `translate(${viTriAnh.translateX}rem, ${viTriAnh.translateY}rem) scale(${viTriAnh.scale})`,
  }
  //#region Xử lý ảnh
  const thayDoiViTriAnh = (p: string) => {
    switch (p) {
      case "up":
        setViTriAnh(prev => ({
          ...prev,
          translateY: prev.translateY - 1,
        }));
        break;
      case "down":
        setViTriAnh(prev => ({
          ...prev,
          translateY: prev.translateY + 1,
        }));
        break;
      case "left":
        setViTriAnh(prev => ({
          ...prev,
          translateX: prev.translateX - 1,
        }));
        break;
      case "right":
        setViTriAnh(prev => ({
          ...prev,
          translateX: prev.translateX + 1,
        }));
        break;
      case "in":
        setViTriAnh(prev => ({
          ...prev,
          scale: prev.scale + .1,
        }));
        break;
      case "out":
        setViTriAnh(prev => ({
          ...prev,
          scale: prev.scale - .1,
        }));
        break;
      default:
        setViTriAnh(prev => ({
          translateX: 0,
          translateY: 0,
          scale: 1
        }))
        break;
    };
  };
  //#endregion
  //#region Xử lý thông tin
  const taiLen = () => {
    thayDoiViTriAnh("macdinh");
    let iptFile = document.getElementById("ipt-file");
    iptFile?.addEventListener("change", function (e: any) {
      let file = e.target.files[0];
      if (file) {
        // // const imgBlob = await fetch(imgSrc).then(res => res.arrayBuffer()).then(buffer => new Blob([buffer], { type: "image/jpeg" }));
        const imgBlob = new Blob([file], { type: "image/jpeg" });
        thayDoiThongTin({
          FileSrc: URL.createObjectURL(imgBlob)
        });
      };
    });
    iptFile?.click();
  };
  const taiXuong = async () => {
    if (thongTin.HoTen?.trim() == "" || thongTin.MaVi?.trim() == "") {
      setValidated(true);
    } else {
      setValidated(false);
      // console.log(thongTin);
      if (thongTin.FileSrc) {
        // Tải ảnh
        let imgSrc = "", imgName = `[UnicornUltra]ThuMoi.png`;
        // const imgBlob = new Blob([thongTin.File], { type: "image/jpeg" });
        // const link = document.createElement("a");
        // link.href = thongTin.FileSrc;
        // link.download = imgName;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        const container: any = sectionThuMoiRef.current;

        html2canvas(container).then(canvas => {
          // Chuyển đổi canvas thành dữ liệu ảnh (base64)
          const imageBase64 = canvas.toDataURL("image/png");

          // Tạo một đường dẫn tải về ảnh
          const link = document.createElement("a");
          link.href = imageBase64;
          link.download = imgName;
          link.click();
          // thayDoiViTriAnh("macdinh");
          setModal(false);
        });
      };
    };
  };
  const thayDoiThongTin = (cur: ThongTinDto) => {
    setThongTin((prev: ThongTinDto) => ({
      ...prev,
      ...cur
    }))
  };
  //#endregion
  return (
    <main>
      <Container className="position-relative" id="section-thumoi" ref={sectionThuMoiRef}>
        <img src="./section-thumoi/img-banner.png" id="thumoi-img-banner" />
        {/* Banner-header */}
        <div className="" id="thumoi-header-container">
          <Row>
            {/* <Col className="text-center">
              <img src="./section-thumoi/img-logo.png" id="thumoi-img-logo" />
            </Col> */}
          </Row>
          <Row>
            <Col className="text-center">
              <img src="./section-thumoi/img-tieude.png" id="thumoi-img-tieude" />
            </Col>
          </Row>
        </div>
        <img src="./section-thumoi/img-thuyen.png" id="thumoi-img-thuyen" />
        {/* Banner-body */}
        <Button className="box-shadow" variant="secondary" size="sm" id="btn-scaleUp" onClick={() => thayDoiViTriAnh("in")}>
          <Icon
            iconName="ZoomIn"
            color=""
            className="align-center" />
        </Button>
        <Button className="box-shadow" variant="secondary" size="sm" id="btn-scaleDown" onClick={() => thayDoiViTriAnh("out")}>
          <Icon
            iconName="ZoomOut"
            color=""
            className="align-center" />
        </Button>
        <div className="box-shadow" id="thumoi-body-container">
          <div id="thumoi-body-img-container">
            {/* Btn - vị trí */}
            <Button className="box-shadow" variant="secondary" size="sm" id="btn-moveUp" onClick={() => thayDoiViTriAnh("up")}>
              <Icon
                iconName="CaretUpFill"
                color=""
                className="align-center" />
            </Button>
            <Button className="box-shadow" variant="secondary" size="sm" id="btn-moveDown" onClick={() => thayDoiViTriAnh("down")}>
              <Icon
                iconName="CaretDownFill"
                color=""
                className="align-center" />
            </Button>
            <Button className="box-shadow" variant="secondary" size="sm" id="btn-moveLeft" onClick={() => thayDoiViTriAnh("left")}>
              <Icon
                iconName="CaretLeftFill"
                color=""
                className="align-center" />
            </Button>
            <Button className="box-shadow" variant="secondary" size="sm" id="btn-moveRight" onClick={() => thayDoiViTriAnh("right")}>
              <Icon
                iconName="CaretRightFill"
                color=""
                className="align-center" />
            </Button>
            {/* Ảnh */}
            <Image src={thongTin.FileSrc} id="img-overlay"
              style={{
                transform: `translate(${viTriAnh.translateX}rem, ${viTriAnh.translateY}rem) scale(${viTriAnh.scale})`
              }} />
          </div>
        </div>
        {/* Banner-footer */}
        <div className="" id="thumoi-footer-container">
          {/* Kính mời */}
          <Row>
            <Col className="text-center p-1">
              <img src="./section-thumoi/img-kinhmoi.png" id="thumoi-img-kinhmoi" />
            </Col>
          </Row>
          {/* Họ tên */}
          <Row>
            <Col className="text-center">
              <span className="ff-Valky-Bold text-white" style={{
                fontSize: "1rem"
              }}>Doanh nhân: Hoà Phạm</span>
            </Col>
          </Row>
          {/* Tham gia */}
          <Row>
            <Col className="text-center pb-1">
              <img src="./section-thumoi/img-thamgia.png" id="thumoi-img-thamgia" />
            </Col>
          </Row>
          {/* Địa điểm - Thời gian - Đối tác */}
          <Row>
            <Col className="text-center">
              <img src="./section-thumoi/img-thoigian.png" id="thumoi-img-thoigian" />
            </Col>
            <Col className="text-center">
              <img src="./section-thumoi/img-diadiem.png" id="thumoi-img-diadiem" />
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-3">
              <img src="./section-thumoi/img-doitac.png" id="thumoi-img-doitac" />
            </Col>
          </Row>
        </div>
      </Container>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            {/* Họ và tên */}
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập thông tin ..."
                value={thongTin.HoTen}
                onChange={(e) => thayDoiThongTin({
                  HoTen: e.currentTarget.value
                })} />
              <Form.Control.Feedback type="invalid">
                Không bỏ trống.
              </Form.Control.Feedback>
            </Form.Group>
            {/* Mã ví */}
            <Form.Group className="mb-3">
              <Form.Label>Mã ví <span className="text-danger">*</span></Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Mã 42 ký tự ..."
                value={thongTin.MaVi}
                onChange={(e) => thayDoiThongTin({
                  MaVi: e.currentTarget.value
                })}
              />
              <Form.Control.Feedback type="invalid">
                Không bỏ trống.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => taiXuong()}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>
      {/* <p className="text-gradient ff-BeVietNam-Bold">ĐẠI HỒNG THUỶ</p>
      <p className="text-gradient ff-BeVietNam-ExtraBold">ĐẠI HỒNG THUỶ</p>
      <p className="text-gradient ff-BeVietNam-Light">ĐẠI HỒNG THUỶ</p>
      <p className="text-gradient ff-BeVietNam-Regular">ĐẠI HỒNG THUỶ</p>
      <p className="text-gradient ff-BeVietNam-SemiBold">ĐẠI HỒNG THUỶ</p>
      <p className="text-gradient ff-Valky-Bold">ĐẠI HỒNG THUỶ</p> */}
      <div className="main-container ">
        <div className="text-center w-100">
          <input type="file" id="ipt-file" accept=".png, .jpg, .jpeg" hidden />
          <ToggleButtonGroup className="my-2 w-100" type="radio" name="options" defaultValue={1}>
            <ToggleButton id="btn-tailen" value={1} onClick={() => taiLen()}>
              <Icon
                iconName="Upload"
                color=""
                className="align-center" />
              &ensp;
              Tải lên
            </ToggleButton>
            <ToggleButton id="btn-taixuong" value={2} onClick={() => setModal(true)}>
              <Icon
                iconName="Download"
                color=""
                className="align-center" />
              &ensp;
              Tải xuống
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </main >
  )
}
