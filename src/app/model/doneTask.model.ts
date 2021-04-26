
export class DoneTask
{
  constructor(
  public user_id: number,
  public category_id: number,
  public task_title:string,
  public task_description:string,
  public task_isCollab:number
  ){}
}
