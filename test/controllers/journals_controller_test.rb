require 'test_helper'

class JournalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @journal = journals(:one)
  end

  test "should get index" do
    get journals_url
    assert_response :success
  end

  test "should get new" do
    get new_journal_url
    assert_response :success
  end

  test "should create journal" do
    assert_difference('Journal.count') do
      post journals_url, params: { journal: { name: @journal.name } }
    end

    assert_redirected_to journal_url(Journal.last)
  end

  test "should show journal and entries" do
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text',
    )
    get journal_url(@journal)
    assert_response :success
    assert_select 'body', /.*#{@journal.name}.*/
    assert_select 'body', /.*test-entry-text.*edit.*/
    assert_select 'input[type="submit"][value=?]', 'Create Journal entry'
  end

  test "should break down journal lines by day" do
    t = Time.local(2000, 1, 1, 10, 0, 0)
    Timecop.travel(t)
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-1',
    )
    t = Time.local(2000, 1, 12, 10, 0, 0)
    Timecop.travel(t)
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-2',
    )
    get journal_url(@journal)

    order = [
      '1/1/2000',
      'test-entry-text-1',
      '1/12/2000',
      'test-entry-text-2',
    ]
    expected = Regexp.new(order.join('.*?'), Regexp::MULTILINE)

    assert_response :success
    assert_select 'body', expected
  end

  test "should get edit" do
    get edit_journal_url(@journal)
    assert_response :success
  end

  test "should update journal" do
    patch journal_url(@journal), params: { journal: { name: @journal.name } }
    assert_redirected_to journal_url(@journal)
  end

  test "should destroy journal" do
    assert_difference('Journal.count', -1) do
      delete journal_url(@journal)
    end

    assert_redirected_to journals_url
  end
end
