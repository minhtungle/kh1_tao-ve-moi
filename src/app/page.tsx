'use client'
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import styles from './page.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Icon } from './components/Icon';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { File } from 'buffer';

interface ThongTinDto {
  FileSrc?: string,
  HoTen?: string,
  MaVi?: string
};
export default function Home() {
  const [modal, setModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [thongTin, setThongTin] = useState<ThongTinDto>({
    FileSrc: "./900x900.jpeg",
    HoTen: "",
    MaVi: ""
  });
  const taiLen = () => {
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
        let imgSrc = "", imgName = "ThuMoi";
        // const imgBlob = new Blob([thongTin.File], { type: "image/jpeg" });
        const link = document.createElement("a");
        link.href = thongTin.FileSrc;
        link.download = imgName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    };
  };
  const thayDoiThongTin = (cur: ThongTinDto) => {
    setThongTin((prev: ThongTinDto) => ({
      ...prev,
      ...cur
    }))
  };
  return (
    <main className={styles.main}>
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <Image src={thongTin.FileSrc} fluid />
            </div>
            <div className="text-center">
              <input type="file" id="ipt-file" accept=".png, .jpg, .jpeg" hidden />
              <Button variant="secondary" className="m-2" onClick={() => taiLen()}>
                <Icon
                  iconName="Upload"
                  color=""
                  className="align-center" />
                &ensp;Tải lên
              </Button>
              <Button variant="primary" className="m-2" onClick={() => setModal(true)}>
                <Icon
                  iconName="Download"
                  color=""
                  className="align-center" />
                &ensp;Tải xuống
              </Button>
            </div>
          </Col>
        </Row>
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
    </main>
  )
}
