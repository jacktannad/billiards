// 优惠券类型
export const COUPON_tYPE = {
  open_table: '满减券',
  open_duration: '时长券'
}

// 支付渠道
export const Platform_Type = {
  PT_WEIXIN: '微信支付',
  PT_ALIPAY: '支付宝支付',
  PT_SELF: '余额支付',
  PT_TICKET: '',
  PT_EXCHANGE: '',
  PT_ABC: '',
  PT_BACKEND: '后台支付',
  PT_BILLIARD: '台币支付'
}

// 提现状态
export const Withdraw_Status = {
  '0': '审核中',
  '1': '提现成功',
  '2': '提现失败'
}

// 需求状态
export const demandState = {
  '0': '待处理',
  '1': '待审核',
  '2': '待确认',
  '3': '进行中',
  '16': '已完成'
}
// 任务状态
export const taskState = {
  '0': '待处理',
  '1': '待审核',
  '2': '待确认',
  '4': '待分配',
  '5': '待指派',
  '6': '待接收',
  '7': '风格设计中',
  '8': '风格确认中',
  '9': '开发中',
  '10': '测试环境验收中',
  '11': '生产环境发布中',
  '12': '生产环境验收中',
  '13': '费用待确认',
  '14': '结算确认中',
  '15': '待结算',
  '16': '已完成',
  '17': '金额确认中',
  '18': '已关闭'
}

export const stateColor = {
  '0': ['#E91E3F', '#FDE8EB'],
  '1': ['#006BF8', '#E5F0FF'],
  '2': ['#006BF8', '#E5F0FF'],
  '3': ['#006BF8', '#E5F0FF'],
  '4': ['#006BF8', '#E5F0FF'],
  '5': ['#006BF8', '#E5F0FF'],
  '6': ['#006BF8', '#E5F0FF'],
  '7': ['#F58039', '#FEF2EB'],
  '8': ['#F58039', '#FEF2EB'],
  '9': ['#F58039', '#FEF2EB'],
  '10': ['#F58039', '#FEF2EB'],
  '11': ['#F58039', '#FEF2EB'],
  '12': ['#F58039', '#FEF2EB'],
  '13': ['#26C9BD', '#D3F4F2'],
  '14': ['#63CA2F', '#EAFBDA'],
  '15': ['#07B52E', '#DDFAE4'],
  '16': ['#058012', '#E2FFE5'],
  '17': ['#26C9BD', '#D3F4F2'],
  '18': ['#94969c', '#f4f4f4']
}

// 需求状态
export const parType = {
  '1': '比',
  '2': '协',
  '3': '拆'
}
// 任务类型大类
export const briefBigType = {
  '1': '手机端',
  '2': 'PC端'
}

// 绩效模板规则
export const performanceRuleType = {
  '1': '个人',
  '2': '组绩效'
}

// 绩效模板规则
export const designerType = {
  'zhuchuang': '主创设计师',
  'zhuli': '助理设计师',
  'shixi': '实习设计师'
}

// 关闭原因
export const closeReason = {
  '1': '作品比稿流标',
  '2': '作品不合格流标',
  '3': '客户单方面取消'
}

// 任务类型
export const workType = {
  '1': 'bug修改',
  '2': '功能优化',
  '3': '功能新增 '
}
