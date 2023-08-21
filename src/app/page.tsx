'use client'
import { useState, useRef } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Icon } from './components/Icon';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import html2canvas from 'html2canvas';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

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
  //#region Mail
  // const client = new SMTPClient({
  //   user: 'MinhTung',
  //   password: 'Mail2023@1',
  //   host: 'mrtungpro123@gmail.com',
  //   ssl: true,
  // });

  const guiMail = async () => {
    // try {
    //   const message = await client.sendAsync({
    //     text: `${thongTin.HoTen} - ${thongTin.MaVi}`,
    //     from: 'mrtungpro123@gmail.com',
    //     to: 'minhtungle411@gmail.com',
    //     cc: 'minhtungle.giap@gmail.com',
    //     subject: 'Người dùng đăng ký vé',
    //   });
    //   console.log(message);
    // } catch (err) {
    //   console.error(err);
    // };
  }
  //#endregion

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
        guiMail();
        // thayDoiViTriAnh("macdinh");
      });
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
      {/* Thư mời */}
      <Container className="position-relative" id="section-thumoi" ref={sectionThuMoiRef}>
        {/* <img src="./section-thumoi/img-banner.png" id="thumoi-img-banner" /> */}
        {/* Banner-header */}
        <div className="" id="thumoi-header-container">
          <Row>
            <Col className="text-center p-2">
              <img src="./section-thumoi/img-logo.png" id="thumoi-img-logo" />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <img src="./section-thumoi/img-tieude.png" id="thumoi-img-tieude" />
            </Col>
          </Row>
        </div>
        {/* Banner-body */}
        <div className="" id="thumoi-body-container">
          <Row>
            <Col md="12" className="text-center d-flex justify-content-center align-items-center flex-column position-relative">
              <img src="./section-thumoi/img-thuyen.png" id="thumoi-img-thuyen" />
              <div className="thumoi-img-avt-container thumoi-img-avt-container-layer1 box-shadow" id="thumoi-img-avt-container-layer1">
                <div className="thumoi-img-avt-container thumoi-img-avt-container-layer2" id="thumoi-img-avt-container-layer2">
                  <Image src={thongTin.FileSrc} className="thumoi-img-anhdaidien-tailen" style={anhStyle} />
                </div>
              </div>
            </Col>
            <Col md="12" className="text-center d-flex justify-content-center align-items-center flex-column" id="thumoi-hoten-container">
              <img className="" src="./section-thumoi/img-kinhmoi.png" id="thumoi-img-kinhmoi" />
              <span className="ff-Valky-Bold text-white" id="thumoi-hoten-text">{thongTin.HoTen == "" ? "__________________" : thongTin.HoTen}</span>
              <img src="./section-thumoi/img-thamgia.png" id="thumoi-img-thamgia" />
            </Col>
          </Row>
        </div>
        {/* Banner-footer */}
        <div className="" id="thumoi-footer-container">
          <Row>
            <Col className="text-center">
              <img src="./section-thumoi/img-thoigian.png" id="thumoi-img-thoigian" />
            </Col>
            <Col className="text-center">
              <img src="./section-thumoi/img-diadiem.png" id="thumoi-img-diadiem" />
            </Col>
            <Col md="12" className="text-center p-3">
              <img src="./section-thumoi/img-doitac.png" id="thumoi-img-doitac" />
            </Col>
          </Row>
        </div>
      </Container>
      {/* Thao tác */}
      <Container className="position-relative p-0" id="section-thaotac">
        <div className="text-center w-100" id="btn-thaotac-container">
          <input type="file" id="ipt-file" accept=".png, .jpg, .jpeg" hidden />
          <ToggleButtonGroup className="w-100" type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="secondary" id="btn-chinhsua" value={1} onClick={() => setModal(true)}>
              <Icon
                iconName="Pencil"
                color=""
                className="align-center" />
              &ensp;
              Chỉnh sửa
            </ToggleButton>
            <ToggleButton variant="secondary" id="btn-taixuong" value={2} onClick={() => taiXuong()}>
              <Icon
                iconName="Download"
                color=""
                className="align-center" />
              &ensp;
              Tải vé mời
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Container>
      {/* Lịch trình */}
      <Container className="position-relative" id="section-lichtrinh" />
      {/* Quy định */}
      <Container className="position-relative" id="section-quydinh" />
      {/* Lưu ý */}
      <Container className="position-relative" id="section-luuy" />

      {/* Modal - chỉnh sửa */}
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        backdrop="static"
        keyboard={false}
        id="modal-chinhsua"
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <div className="w-100 text-center d-flex justify-content-center align-items-center flex-column position-relative" id="">
              <div className="thumoi-img-avt-container thumoi-img-avt-container-layer1">
                <div className="thumoi-img-avt-container thumoi-img-avt-container-layer2">
                  <Image src={thongTin.FileSrc} className="thumoi-img-anhdaidien-tailen" style={anhStyle} />
                </div>
              </div>
            </div>
            {/* Btn - vị trí */}
            <ButtonToolbar className="my-3 justify-content-center" aria-label="">
              <ButtonGroup className="me-2" aria-label="1">
                <Button variant="secondary" id="btn-tailen" onClick={() => taiLen()}>
                  <Icon
                    iconName="Upload"
                    color=""
                    className="align-center" />
                </Button>
              </ButtonGroup>
              <ButtonGroup aria-label="2">
                <Button variant="secondary" id="btn-moveUp" onClick={() => thayDoiViTriAnh("up")}>
                  <Icon
                    iconName="CaretUpFill"
                    color=""
                    className="align-center" />
                </Button>
                <Button variant="secondary" id="btn-moveDown" onClick={() => thayDoiViTriAnh("down")}>
                  <Icon
                    iconName="CaretDownFill"
                    color=""
                    className="align-center" />
                </Button>
                <Button variant="secondary" id="btn-moveLeft" onClick={() => thayDoiViTriAnh("left")}>
                  <Icon
                    iconName="CaretLeftFill"
                    color=""
                    className="align-center" />
                </Button>
                <Button variant="secondary" id="btn-moveRight" onClick={() => thayDoiViTriAnh("right")}>
                  <Icon
                    iconName="CaretRightFill"
                    color=""
                    className="align-center" />
                </Button>
                <Button variant="secondary" id="btn-scaleUp" onClick={() => thayDoiViTriAnh("in")}>
                  <Icon
                    iconName="ZoomIn"
                    color=""
                    className="align-center" />
                </Button>
                <Button variant="secondary" id="btn-scaleDown" onClick={() => thayDoiViTriAnh("out")}>
                  <Icon
                    iconName="ZoomOut"
                    color=""
                    className="align-center" />
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
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
          <Button variant="secondary" onClick={() => setModal(false)}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>
    </main >
  )
}
