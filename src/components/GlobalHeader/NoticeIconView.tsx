import { Component } from 'react';
import type { ConnectProps } from 'umi';
import { message } from 'antd';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
} & Partial<ConnectProps>;

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  }

  handleNoticeClear = (title: string, key: string) => {
    const { dispatch } = this.props;
    message.success(`${'清空了'} ${title}`);

    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };

  render() {
    const { fetchingNotices, onNoticeVisibleChange } = this.props;
    return (
      <NoticeIcon
        className={styles.action}
        count={0}
        loading={fetchingNotices}
        clearText="清空"
        viewMoreText="查看更多"
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={0}
          list={[]}
          title="通知"
          emptyText="你已查看所有通知"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="message"
          count={0}
          list={[]}
          title="消息"
          emptyText="您已读完所有消息"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="event"
          title="待办"
          emptyText="你已完成所有待办"
          count={0}
          list={[]}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default GlobalHeaderRight;
