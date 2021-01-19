import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Row, Col, Table, Button, Alert } from '@gqlapp/look-client-react';

const UploadView = ({ fileDetails, uploadId, error, loading, handleUploadFiles, handleRemoveFile, t }) => {
  const columns = [
    {
      title: t('table.column.name'),
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <p>
            {text} ({record.size / 1024 + 'KB'})
          </p>
        );
      }
    },
    {
      title: t('table.column.actions'),
      key: 'actions',
      width: 50,
      render() {
        return (
          <Button color="primary" size="sm" onClick={() => handleRemoveFile(uploadId)}>
            {t('table.btnDel')}
          </Button>
        );
      }
    }
  ];

  return (
    <div className="text-center">
      <Row>
        <Col xs={4}>
          <Dropzone onDrop={handleUploadFiles}>
            <p>{t('message')}</p>
          </Dropzone>
        </Col>
        <Col xs={8}>
          {loading && <span>Loading...</span>}
          {error && <Alert color="error">{error}</Alert>}
          <Table dataSource={fileDetails ? fileDetails : []} columns={columns} />
        </Col>
      </Row>
    </div>
  );
};

UploadView.propTypes = {
  files: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  fileDetails: PropTypes.array,
  uploadId: PropTypes.integer,
  handleUploadFiles: PropTypes.func.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default UploadView;
