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
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import html2canvas from 'html2canvas';

interface ThongTinDto {
  FileSrc?: string,
  HoTen?: string,
  MaVi?: string
};
export default function Home() {
  const [modal, setModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [thongTin, setThongTin] = useState<ThongTinDto>({
    FileSrc: "./900x900.png",
    HoTen: "",
    MaVi: ""
  });

  const imgOverlayRef = useRef(null);
  const imgContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // const handleMouseDown = event => {
  //   setIsDragging(true);
  //   const imgOverlay = imgOverlayRef.current;
  //   const imgContainer = imgContainerRef.current;

  //   const imgRect = imgOverlay.getBoundingClientRect();
  //   const containerRect = imgContainer.getBoundingClientRect();

  //   setDragOffset({
  //     x: event.clientX - imgRect.left + containerRect.left,
  //     y: event.clientY - imgRect.top + containerRect.top,
  //   });

  //   document.addEventListener('mousemove', handleMouseMove);
  //   document.addEventListener('mouseup', handleMouseUp);
  // };

  // const handleMouseMove = event => {
  //   if (!isDragging) return;

  //   const imgOverlay = imgOverlayRef.current;
  //   const imgContainer = imgContainerRef.current;

  //   const containerRect = imgContainer.getBoundingClientRect();

  //   const newX = event.clientX - containerRect.left - dragOffset.x;
  //   const newY = event.clientY - containerRect.top - dragOffset.y;

  //   imgOverlay.style.left = `${newX}px`;
  //   imgOverlay.style.top = `${newY}px`;
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   document.removeEventListener('mousemove', handleMouseMove);
  //   document.removeEventListener('mouseup', handleMouseUp);
  // };

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
        let imgSrc = "", imgName = `UnicornUltra-${thongTin.HoTen}.png`;
        // const imgBlob = new Blob([thongTin.File], { type: "image/jpeg" });
        // const link = document.createElement("a");
        // link.href = thongTin.FileSrc;
        // link.download = imgName;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        const imgContainer: any = imgContainerRef.current;

        html2canvas(imgContainer)
          .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = imgName;
            link.click();
          })
          .catch(error => {
            console.error('Error creating combined image:', error);
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
  return (
    <main className={styles.main}>
      <Container>
        <Row>
          <Col className="main-container">
            <div id="img-container" ref={imgContainerRef}>
              <Image src="./900x900.png" id="img-bg" />
              <Image src={thongTin.FileSrc} id="img-overlay"
                ref={imgOverlayRef}
              // onMouseDown={handleMouseDown}
              />
              {/* <Form.Range id="ipt-range-scale" /> */}
              {/* <Form.Range id="ipt-range-moveY" />
              <Form.Range id="ipt-range-moveX" /> */}
            </div>

            <div className="text-center w-100">
              <input type="file" id="ipt-file" accept=".png, .jpg, .jpeg" hidden />
              <ButtonGroup aria-label="Basic example" className="m-2 w-100">
                <Button variant="outline-primary" onClick={() => taiLen()}>
                  <Icon
                    iconName="Upload"
                    color=""
                    className="align-center" />
                  &ensp;
                  Tải lên
                </Button>
                <Button variant="outline-primary" onClick={() => setModal(true)}>
                  <Icon
                    iconName="Download"
                    color=""
                    className="align-center" />
                  &ensp;
                  Tải xuống
                </Button>
              </ButtonGroup>
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
