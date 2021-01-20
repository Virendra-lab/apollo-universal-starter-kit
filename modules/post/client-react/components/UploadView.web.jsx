import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Row, Col, Alert } from '@gqlapp/look-client-react';

const UploadView = ({ uploadId, filePath, error, loading, handleUploadFiles, t }) => {
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
          <div>
            {filePath && !uploadId && (
              <img width="200px" src={'/' + filePath} alt="" style={{ paddingBottom: '2em' }} />
            )}
            {uploadId != '0' && <img width="200px" src={'/' + uploadId} alt="" style={{ paddingBottom: '2em' }} />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

UploadView.propTypes = {
  files: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  uploadId: PropTypes.integer,
  filePath: PropTypes.string,
  handleUploadFiles: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default UploadView;
