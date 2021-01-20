import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button } from '@gqlapp/look-client-react';
import Upload from '../containers/Upload';

const postFormSchema = {
  title: [required],
  content: [required],
  fileId: []
};

const PostForm = ({ values, handleSubmit, submitting, t }) => {
  const setupFileId = id => {
    values.fileId = id;
  };

  return (
    <Form name="post" onSubmit={handleSubmit}>
      <Field name="title" component={RenderField} type="text" label={t('post.field.title')} value={values.title} />
      <Field
        name="content"
        component={RenderField}
        type="text"
        label={t('post.field.content')}
        value={values.content}
      />
      <div className="p-3">
        <Upload setupFileId={setupFileId} filePath={values.fileId} />
      </div>
      <Button color="primary" type="submit" disabled={submitting}>
        {t('post.btn.submit')}
      </Button>
    </Form>
  );
};

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  post: PropTypes.object,
  t: PropTypes.func
};

const PostFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    title: props.post && props.post.title,
    content: props.post && props.post.content,
    fileId: props.post && props.post.fileId
  }),

  validate: values => validate(values, postFormSchema),

  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    onSubmit(values);
  },

  enableReinitialize: true,
  displayName: 'PostForm' // helps with React DevTools
});

export default translate('post')(PostFormWithFormik(PostForm));
