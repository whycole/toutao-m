/**
 * 文章评论请求相关模块
 */
import request from "../utils/request";

/**
 * 获取文章评论或评论回复列表
 */
export const getComment = params => {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}