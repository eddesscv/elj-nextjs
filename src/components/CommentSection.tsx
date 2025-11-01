import React, { useState } from 'react';
import { MessageCircle, Heart, Reply, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Comment } from '../types/games';

interface CommentSectionProps {
  itemId: string;
  itemType: 'quiz' | 'game' | 'lesson';
  comments: Comment[];
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  itemId,
  itemType,
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && isAuthenticated) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Comments ({comments.length})
        </h3>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
        >
          {showComments ? 'Hide' : 'Show'} Comments
        </button>
      </div>

      {showComments && (
        <>
          {/* Add Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex gap-3">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
              <p className="text-gray-600">Please sign in to leave a comment</p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={() => onLikeComment(comment.id)}
                  isAuthenticated={isAuthenticated}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const CommentItem: React.FC<{
  comment: Comment;
  onLike: () => void;
  isAuthenticated: boolean;
}> = ({ comment, onLike, isAuthenticated }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex gap-3">
      <img
        src={comment.userAvatar || `https://ui-avatars.com/api/?name=${comment.userName}&background=6366f1&color=fff`}
        alt={comment.userName}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-800">{comment.userName}</span>
            <span className="text-xs text-gray-500">{comment.timestamp}</span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-sm">
          <button
            onClick={onLike}
            disabled={!isAuthenticated}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 disabled:cursor-not-allowed"
          >
            <Heart className="w-4 h-4" />
            {comment.likes}
          </button>
          
          {comment.replies && comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-gray-500 hover:text-purple-600"
            >
              <Reply className="w-4 h-4" />
              {comment.replies.length} replies
            </button>
          )}
        </div>

        {showReplies && comment.replies && (
          <div className="ml-4 mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={() => {}}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};