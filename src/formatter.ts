import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { Octokit } from '@octokit/rest'
const octokit = new Octokit()

type PullRequestGetResponseDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.pulls.get>
type IssuesGetResponseDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.issues.get>

interface RecordPullRequest {
  repo: string
  id: number
  owner: string
  author: string
  created_at: number
  closed_at: number
  merged_at: number
  assignees: number
  reviewers: number
  body_length: number
  time_to_merge: number
  merged_by: string
  commits: number
  review_comments: number
  additions: number
  deletions: number
  changed_files: number
}

export function formatPullRequest (pull: PullRequestGetResponseDataType): RecordPullRequest {
  return {
    repo: pull.base.repo.name,
    id: pull.number,
    owner: pull.base.user.login,
    author: pull.user.login,
    commits: pull.commits,
    review_comments: pull.review_comments,
    additions: pull.additions,
    deletions: pull.deletions,
    changed_files: pull.changed_files,
    merged_by: pull.merged_by ? pull.merged_by.login : '',
    created_at: Date.parse(pull.created_at),
    closed_at: pull.closed_at ? Date.parse(pull.closed_at) : 0,
    merged_at: pull.merged_at ? Date.parse(pull.merged_at) : 0,
    assignees: pull.assignees ? pull.assignees.length : 0,
    reviewers: pull.requested_reviewers ? pull.requested_reviewers.length : 0,
    body_length: pull.body ? pull.body.length : 0,
    time_to_merge: pull.merged_at ? Date.parse(pull.merged_at) - Date.parse(pull.created_at) : 0,
  }
}

interface RecordIssue {
  repo: string
  id: number
  owner: string
  author: string
  created_at: number
  closed_at: number
  assignees: number
  body_length: number
  time_to_merge: number
  closed_by: string
  comments: number
}

export function formatIssue (issue: IssuesGetResponseDataType): RecordIssue {
  return {
    repo: issue.repository_url.split('/').reverse()[0],
    id: issue.number,
    owner: issue.repository_url.split('/').reverse()[1],
    author: issue.user.login,
    comments: issue.comments,
    closed_by: issue.closed_by ? issue.closed_by.login : '',
    created_at: Date.parse(issue.created_at),
    closed_at: issue.closed_at ? Date.parse(issue.closed_at) : 0,
    assignees: issue.assignees.length,
    body_length: issue.body ? issue.body.length : 0,
    time_to_merge: issue.closed_at ? Date.parse(issue.closed_at) - Date.parse(issue.created_at) : 0,
  }
}
