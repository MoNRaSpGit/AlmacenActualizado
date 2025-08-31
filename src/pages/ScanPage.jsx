import { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { fetchProductByBarcode } from "../services/api";

export default function ScanPage() {
    const [barcode, setBarcode] = useState("");
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!barcode.trim()) return;

        setLoading(true);
        setError(null);
        setProduct(null);

        try {
            const data = await fetchProductByBarcode(barcode);
            console.log("👉 Data del backend:", data); // 👈 para ver la forma real
            if (data) {
                setProduct(data);
            } else {
                setError("Producto no encontrado");
            }
        } catch (err) {
            setError("Error al conectar con el servidor");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="scan-page d-flex align-items-center justify-content-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center text-light mb-4">
                            Escanear / Buscar Producto
                        </h1>
                        <Form onSubmit={handleSubmit} className="p-4 rounded shadow form-card">
                            <Form.Group controlId="barcodeInput" className="mb-3">
                                <Form.Label className="text-light">Código de Barras</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese o escanee el código"
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    autoFocus
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit" variant="light" className="btn-contrast" disabled={loading}>
                                    {loading ? "Buscando..." : "Buscar"}
                                </Button>
                            </div>
                        </Form>

                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                        {product && (
                            <Card className="mt-4 p-3 text-center">
                                {product.image_url && (
                                    <Card.Img
                                        variant="top"
                                        src={product.image_url}
                                        alt={product.name}
                                        style={{ maxHeight: "200px", objectFit: "contain" }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Código: {product.barcode}</Card.Text>
                                    <Card.Text>Precio: ${product.price}</Card.Text>
                                    <Card.Text>{product.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
